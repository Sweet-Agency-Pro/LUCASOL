import { NextResponse } from "next/server";
import { createServerSupabase, createAdminServerSupabase } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    // 1. Vérification de l'authentification de l'utilisateur admin
    const supabaseUserClient = await createServerSupabase();
    const {
      data: { user },
    } = await supabaseUserClient.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // 2. Extraction du FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "realisations";
    const path = formData.get("path") as string | null;

    if (!file || !path) {
      return NextResponse.json(
        { error: "Fichier et chemin requis" },
        { status: 400 }
      );
    }

    // 3. Conversion du fichier en Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload avec la clé service_role (bypasse les politiques RLS)
    const supabaseAdmin = createAdminServerSupabase();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Erreur d'upload storage admin:", uploadError);
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    // 5. Récupération de l'URL publique
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(path);

    return NextResponse.json({ publicUrl: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Erreur API /api/admin/upload:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur lors de l'upload" },
      { status: 500 }
    );
  }
}
