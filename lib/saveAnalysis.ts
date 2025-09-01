import { db, storage, ensureSignedInAnonymously } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveAnalysisToFirebase({
  name,
  email,
  consent,
  analysisHTML,
  curlType,
  porosity,
  file,
}: {
  name: string;
  email: string;
  consent: boolean;
  analysisHTML: string;
  curlType: string;
  porosity: string;
  file: File;
}) {
  const uid = await ensureSignedInAnonymously();

  const objectPath = `uploads/${uid}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, objectPath);
  await uploadBytes(storageRef, file, { contentType: file.type });
  const photoURL = await getDownloadURL(storageRef);

  const docRef = await addDoc(collection(db, "analyses"), {
    uid,                        
    name,
    email,
    consent,
    analysisHTML,
    curlType,
    porosity,
    photoURL,
    storagePath: objectPath,
    createdAt: serverTimestamp(),
  });

  return { id: docRef.id, photoURL };
}
