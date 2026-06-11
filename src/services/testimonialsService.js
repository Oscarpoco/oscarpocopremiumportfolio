import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";

const COLLECTION = "testimonials";

const EMPTY_TESTIMONIAL = {
  company: "",
  project: "General collaboration",
  duration: "—",
  technologies: [],
};

function normalizeTestimonial(doc) {
  const data = doc.data();

  return {
    id: `firebase-${doc.id}`,
    source: "firebase",
    name: data.name || "Anonymous",
    role: data.role || "Collaborator",
    content: data.content || "",
    rating: Number(data.rating) || 5,
    company: data.company || EMPTY_TESTIMONIAL.company,
    project: data.project || EMPTY_TESTIMONIAL.project,
    duration: data.duration || EMPTY_TESTIMONIAL.duration,
    technologies: Array.isArray(data.technologies)
      ? data.technologies
      : EMPTY_TESTIMONIAL.technologies,
    createdAt: data.createdAt?.toMillis?.() ?? null,
    date: typeof data.date === "string" ? data.date.trim() : "",
  };
}

export async function fetchFirebaseTestimonials() {
  if (!isFirebaseConfigured() || !db) return [];

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs
      .map(normalizeTestimonial)
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  } catch (error) {
    console.error("Failed to load testimonials from Firebase:", error);
    return [];
  }
}

export async function submitTestimonial({
  name,
  role,
  company,
  content,
  rating,
  project,
  duration,
  technologies,
}) {
  if (!isFirebaseConfigured() || !db) {
    throw new Error("Firebase is not configured.");
  }

  const techList =
    typeof technologies === "string"
      ? technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : technologies;

  await addDoc(collection(db, COLLECTION), {
    name: name.trim(),
    role: role.trim(),
    company: company.trim(),
    content: content.trim(),
    rating: Number(rating),
    project: project.trim() || EMPTY_TESTIMONIAL.project,
    duration: duration.trim() || EMPTY_TESTIMONIAL.duration,
    technologies: techList,
    createdAt: serverTimestamp(),
  });
}
