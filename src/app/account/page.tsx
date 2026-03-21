"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserSidebar from "@/components/user-sidebar";
import OrderHistoryTable, { Order } from "@/components/order-history-table";
import AddressManager, { UserAddress } from "@/components/address-manager";
import SavedCards, { SavedCard } from "@/components/saved-cards";
import { useAuth } from "@/contexts/auth-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, isFirebaseEnabled } from "@/lib/firebase";

type SectionKey = "orders" | "addresses" | "payments" | "profile";

export default function AccountPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionKey>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [fetching, setFetching] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [cardModal, setCardModal] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: userProfile?.firstName ?? "",
    lastName: userProfile?.lastName ?? "",
    idNumber: userProfile?.idNumber ?? "",
    phone: userProfile?.phone ?? "",
    address: userProfile?.address ?? "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setProfileForm({
      firstName: userProfile?.firstName ?? "",
      lastName: userProfile?.lastName ?? "",
      idNumber: userProfile?.idNumber ?? "",
      phone: userProfile?.phone ?? "",
      address: userProfile?.address ?? "",
    });
  }, [userProfile]);

  useEffect(() => {
    const load = async () => {
      if (!user || !db || !isFirebaseEnabled) {
        // fallback demo content if no Firebase config
        if (!user) return;
        return;
      }
      setFetching(true);
      try {
        const ordersRef = collection(db, "orders");
        const addressesRef = collection(db, "addresses");
        const cardsRef = collection(db, "paymentMethods");

        const ordersSnap = await getDocs(
          query(ordersRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"))
        );
        const mappedOrders: Order[] = ordersSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            status: data.status ?? "pendiente",
            createdAt:
              data.createdAt?.toDate?.()?.toISOString().slice(0, 10) ??
              new Date().toISOString().slice(0, 10),
            total: Number(data.total ?? 0),
            tracking: data.tracking ?? "Pendiente",
            items: (data.items as any[])?.map((it) => ({
              name: it.name ?? "Producto",
              qty: it.qty ?? 1,
              price: Number(it.price ?? 0),
            })) ?? [],
          };
        });

        const addrSnap = await getDocs(
          query(addressesRef, where("userId", "==", user.uid))
        );
        const mappedAddr: UserAddress[] = addrSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            label: data.label ?? "Direccion",
            line1: data.line1 ?? "",
            city: data.city ?? "",
            country: data.country ?? "",
            phone: data.phone ?? "",
            isDefault: !!data.isDefault,
          };
        });

        const cardsSnap = await getDocs(
          query(cardsRef, where("userId", "==", user.uid))
        );
        const mappedCards: SavedCard[] = cardsSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            brand: data.brand ?? "Tarjeta",
            last4: data.last4 ?? "0000",
            isDefault: !!data.isDefault,
          };
        });

        setOrders(mappedOrders);
        setAddresses(mappedAddr);
        setCards(mappedCards);
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [user, isFirebaseEnabled]);

  const fullName = useMemo(() => {
    if (userProfile?.firstName || userProfile?.lastName) {
      return `${userProfile?.firstName ?? ""} ${userProfile?.lastName ?? ""}`.trim();
    }
    return user?.email ?? "Invitado";
  }, [user, userProfile]);

  if (loading || (!user && loading === false)) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-2 text-[#042A8F]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando cuenta...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleAddAddress = async (form: {
    label: string;
    line1: string;
    city: string;
    country: string;
    phone: string;
  }) => {
    const { label, line1, city, country, phone } = form;
    if (db && isFirebaseEnabled) {
      if (editingAddress) {
        await updateDoc(doc(db, "addresses", editingAddress.id), {
          label,
          line1,
          city,
          country,
          phone,
        });
        setAddresses((prev) =>
          prev.map((a) =>
            a.id === editingAddress.id ? { ...a, label, line1, city, country, phone } : a
          )
        );
      } else {
        const ref = await addDoc(collection(db, "addresses"), {
          userId: user.uid,
          label,
          line1,
          city,
          country,
          phone,
          isDefault: addresses.length === 0,
          createdAt: serverTimestamp(),
        });
        setAddresses((prev) => [
          ...prev.map((a) => ({
            ...a,
            isDefault: addresses.length === 0 ? false : a.isDefault,
          })),
          {
            id: ref.id,
            label,
            line1,
            city,
            country,
            phone,
            isDefault: addresses.length === 0,
          },
        ]);
      }
      setAddressModal(false);
      setEditingAddress(null);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    if (!db || !isFirebaseEnabled) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id }))
      );
      return;
    }
    const batch = writeBatch(db);
    addresses.forEach((addr) => {
      batch.update(doc(db, "addresses", addr.id), { isDefault: addr.id === id });
    });
    await batch.commit();
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const handleAddCard = async (brand: string, last4: string) => {
    if (db && isFirebaseEnabled) {
      const ref = await addDoc(collection(db, "paymentMethods"), {
        userId: user.uid,
        brand,
        last4,
        isDefault: cards.length === 0,
        createdAt: serverTimestamp(),
      });
      setCards((prev) => [
        ...prev.map((c) => ({
          ...c,
          isDefault: cards.length === 0 ? false : c.isDefault,
        })),
        { id: ref.id, brand, last4, isDefault: cards.length === 0 },
      ]);
      setCardModal(false);
    }
  };

  const handleSetDefaultCard = async (id: string) => {
    if (!db || !isFirebaseEnabled) {
      setCards((prev) =>
        prev.map((c) => ({ ...c, isDefault: c.id === id }))
      );
      return;
    }
    const batch = writeBatch(db);
    cards.forEach((card) => {
      batch.update(doc(db, "paymentMethods", card.id), {
        isDefault: card.id === id,
      });
    });
    await batch.commit();
    setCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === id }))
    );
  };

  const handleDeleteCard = async (id: string) => {
    if (db && isFirebaseEnabled) {
      await updateDoc(doc(db, "paymentMethods", id), { deleted: true });
    }
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveProfile = async () => {
    if (!db || !isFirebaseEnabled || !user) return;
    setProfileSaving(true);
    await setDoc(
      doc(db, "users", user.uid),
      {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        idNumber: profileForm.idNumber,
        phone: profileForm.phone,
        address: profileForm.address,
      },
      { merge: true }
    );
    setProfileSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#00a63e] text-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 lg:flex-row">
        <UserSidebar
          active={activeSection}
          onSelect={(key) => setActiveSection(key)}
          name={fullName}
          email={user.email ?? ""}
        />

        <div className="flex-1 space-y-6">
          {activeSection === "orders" && (
            <OrderHistoryTable
              orders={orders.length ? orders : fallbackOrders()}
              loading={fetching}
            />
          )}
          {activeSection === "addresses" && (
            <AddressManager
              addresses={addresses.length ? addresses : fallbackAddresses()}
              onAdd={() => {
                setEditingAddress(null);
                setAddressModal(true);
              }}
              onEdit={(addr) => {
                setEditingAddress(addr);
                setAddressModal(true);
              }}
              onSetDefault={handleSetDefaultAddress}
            />
          )}
          {activeSection === "payments" && (
            <SavedCards
              cards={cards.length ? cards : fallbackCards()}
              onAdd={() => setCardModal(true)}
              onSetDefault={handleSetDefaultCard}
              onDelete={handleDeleteCard}
            />
          )}
          {activeSection === "profile" && (
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#042A8F]">
                  Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Nombre</Label>
                    <Input
                      value={profileForm.firstName}
                      onChange={(e) =>
                        setProfileForm((s) => ({ ...s, firstName: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Apellidos</Label>
                    <Input
                      value={profileForm.lastName}
                      onChange={(e) =>
                        setProfileForm((s) => ({ ...s, lastName: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Cédula</Label>
                    <Input
                      value={profileForm.idNumber}
                      onChange={(e) =>
                        setProfileForm((s) => ({ ...s, idNumber: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Teléfono</Label>
                    <Input
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm((s) => ({ ...s, phone: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Correo</Label>
                    <Input value={user.email ?? ""} disabled className="bg-gray-100 text-gray-500" />
                  </div>
                  <div className="md:col-span-2 grid gap-2">
                    <Label>Dirección</Label>
                    <Input
                      value={profileForm.address}
                      onChange={(e) =>
                        setProfileForm((s) => ({ ...s, address: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <Button
                  className="bg-[#2E7618] text-white hover:bg-[#255f13]"
                  onClick={handleSaveProfile}
                  disabled={profileSaving}
                >
                  {profileSaving ? "Guardando..." : "Guardar perfil"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog
        open={addressModal}
        onOpenChange={(open) => {
          setAddressModal(open);
          if (!open) setEditingAddress(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#042A8F]">
              {editingAddress ? "Editar direccion" : "Nueva direccion"}
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            initial={editingAddress ?? undefined}
            onSubmit={(values) => handleAddAddress(values)}
            onCancel={() => {
              setAddressModal(false);
              setEditingAddress(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={cardModal} onOpenChange={setCardModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#042A8F]">Nuevo metodo de pago</DialogTitle>
          </DialogHeader>
          <CardForm
            onSubmit={(values) => handleAddCard(values.brand, values.last4)}
            onCancel={() => setCardModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddressForm({
  onSubmit,
  onCancel,
  initial,
}: {
  onSubmit: (v: { label: string; line1: string; city: string; country: string; phone: string }) => void;
  onCancel: () => void;
  initial?: {
    label: string;
    line1: string;
    city: string;
    country: string;
    phone: string;
  };
}) {
  const [form, setForm] = useState({
    label: initial?.label ?? "Casa",
    line1: initial?.line1 ?? "",
    city: initial?.city ?? "Managua",
    country: initial?.country ?? "Nicaragua",
    phone: initial?.phone ?? "",
  });

  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        <Label>Etiqueta</Label>
        <Input
          value={form.label}
          onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Direccion</Label>
        <Input
          value={form.line1}
          onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Ciudad</Label>
        <Input
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Pais</Label>
        <Input
          value={form.country}
          onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Telefono</Label>
        <Input
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          className="bg-[#2E7618] text-white hover:bg-[#255f13]"
          onClick={() => onSubmit(form)}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}

function CardForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (v: { brand: string; last4: string }) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ brand: "Visa", last4: "" });
  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        <Label>Marca</Label>
        <Input
          value={form.brand}
          onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Ultimos 4 digitos</Label>
        <Input
          maxLength={4}
          value={form.last4}
          onChange={(e) => setForm((f) => ({ ...f, last4: e.target.value.replace(/\\D/g, "") }))}
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          className="bg-[#2E7618] text-white hover:bg-[#255f13]"
          onClick={() => onSubmit(form)}
          disabled={form.last4.length !== 4}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}

function fallbackOrders(): Order[] {
  return [
    {
      id: "TLP-10923",
      status: "pendiente",
      createdAt: "2026-03-01",
      total: 89.99,
      tracking: "NICA-332991",
      items: [
        { name: "Boxer brief soporte", qty: 2, price: 34.99 },
        { name: "Trunk modal fresco", qty: 1, price: 19.99 },
      ],
    },
  ];
}

function fallbackAddresses(): UserAddress[] {
  return [
    {
      id: "addr-1",
      label: "Casa",
      line1: "Direccion demo",
      city: "Managua",
      country: "Nicaragua",
      phone: "+505 8888 0000",
      isDefault: true,
    },
  ];
}

function fallbackCards(): SavedCard[] {
  return [{ id: "card-1", brand: "Visa", last4: "8421", isDefault: true }];
}
