"use client";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useProducts } from "@/contexts/products-context";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormState = {
  name: string;
  slug: string;
  price: number;
  material: string;
  type: string;
  description: string;
  sizes: string;
  colors: string;
  imageFiles: File[];
};

const INITIAL_FORM: FormState = {
  name: "",
  slug: "",
  price: 35,
  material: "modal",
  type: "boxer brief",
  description: "",
  sizes: "S,M,L,XL",
  colors: "negro,blanco,gris",
  imageFiles: [],
};

function normalizeFileName(fileName: string) {
  return fileName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "").toLowerCase();
}

export default function ProductsAdminPage() {
  const { products } = useProducts();
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previewUrls]);

  if (!user) {
    router.push("/admin");
    return null;
  }

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setPreviewUrls((prev) => {
      prev.forEach((preview) => URL.revokeObjectURL(preview.url));
      return fileArray.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    });
    setForm((prev) => ({ ...prev, imageFiles: fileArray }));
  };

  const uploadImages = async (
    storageInstance: NonNullable<typeof storage>,
    productSlug: string,
    files: File[]
  ) => {
    if (files.length === 0) return [];

    const uploads = files.map(async (file, index) => {
      const safeName = normalizeFileName(file.name);
      const filePath = `products/${productSlug}/${Date.now()}-${index}-${safeName}`;
      const storageRef = ref(storageInstance, filePath);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    return Promise.all(uploads);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!db || !storage) {
      setError("Firebase no configurado.");
      return;
    }
    if (!form.name.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const slug = form.slug.trim() || form.name.toLowerCase().replace(/\s+/g, "-");
      const imageUrls = await uploadImages(storage, slug, form.imageFiles);

      await addDoc(collection(db, "products"), {
        name: form.name.trim(),
        slug,
        price: Number(form.price),
        material: form.material.trim(),
        type: form.type.trim(),
        description: form.description.trim(),
        sizes: form.sizes.split(",").map((s) => s.trim()),
        colors: form.colors.split(",").map((c) => c.trim()),
        images: imageUrls,
        variants: form.sizes.split(",").flatMap((size) =>
          form.colors.split(",").map((color) => ({
            size: size.trim(),
            color: color.trim(),
            quantity: 20,
          }))
        ),
      });

      setPreviewUrls((prev) => {
        prev.forEach((preview) => URL.revokeObjectURL(preview.url));
        return [];
      });
      setForm(INITIAL_FORM);
    } catch (submitError) {
      console.error(submitError);
      setError("No se pudo guardar el producto. Revisa Storage y Firestore Rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-max space-y-8 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Productos</p>
          <h1 className="text-3xl font-bold text-foreground">Catalogo</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Listado (Firestore)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border border-border p-3">
                <div className="mb-2 aspect-[4/3] overflow-hidden rounded border border-border">
                  <img
                    src={product.images?.[0] ?? "/products/shared/placeholder.png"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/products/shared/placeholder.png";
                    }}
                  />
                </div>
                <p className="font-semibold text-foreground">{product.name}</p>
                <p className="text-sm text-mutedForeground">{product.type}</p>
                <p className="text-sm text-mutedForeground">
                  {product.images?.length ?? 0} imagen(es)
                </p>
                <p className="text-primary">${product.price.toFixed(2)}</p>
              </div>
            ))}
            {products.length === 0 && <p className="text-mutedForeground">No hay productos.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crear producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(["name", "slug", "material", "type", "description", "sizes", "colors"] as const).map(
              (field) => (
                <div key={field} className="grid gap-1.5">
                  <Label className="capitalize">{field}</Label>
                  <Input
                    value={form[field]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                  />
                </div>
              )
            )}

            <div className="grid gap-1.5">
              <Label>Precio</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Imagenes del producto (multiples)</Label>
              <input type="file" accept="image/*" multiple onChange={(e) => handleImagesChange(e.target.files)} />
            </div>

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previewUrls.map((preview) => (
                  <div key={preview.name} className="overflow-hidden rounded border border-border">
                    <img src={preview.url} alt={preview.name} className="h-20 w-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : "Guardar producto"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
