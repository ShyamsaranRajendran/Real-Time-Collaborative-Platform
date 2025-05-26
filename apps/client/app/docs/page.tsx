"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
// import { AuthRequired } from "@/components/auth-required";

export default function NewDocumentPage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a random ID for the new document
    const newDocumentId = uuidv4();
    
    // In a real app, we would create the document in the database first
    // For now, we'll just redirect to the document page with the new ID
    router.push(`/docs/${newDocumentId}`);
  }, [router]);

  return (
    // <AuthRequired>
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3">Creating a new document...</span>
      </div>
    // </AuthRequired>
  );
}