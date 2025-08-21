import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AddProductForm from "./AddProductForm";
import Container from "@/components/Container";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main>
      <Container className="py-6 space-y-4">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <AddProductForm />
      </Container>
    </main>
  );
}
