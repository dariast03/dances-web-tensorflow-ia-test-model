import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

const FIREBASE_KEY = "OSMARTITO";

const getAll = async () => {
  try {
    const dataRef = collection(FirebaseDB, FIREBASE_KEY);
    const snapshot = await getDocs(dataRef);

    const data = snapshot.docs.map((doc) => {
      const data = doc.data() as any;

      return {
        ...data,
        id: doc.id,
      } as any;
    });

    return data;
  } catch (e: any) {
    console.log("🚀 ~ getAll ~ e:", e);
    throw e;
  }
};

const getById = async (id: string) => {
  const dataRef = doc(FirebaseDB, FIREBASE_KEY, id);
  const snapshot = await getDoc(dataRef);

  if (!snapshot.exists()) throw new Error("any not found");

  const data = snapshot.data() as any;

  if (data.status === "Eliminado") throw new Error("any not found");

  return {
    ...data,
    id: snapshot.id,
  } as any;
};

const getByIdRealtime = (
  id: string,
  callback: (data: any | null) => void,
  onError?: (error: any) => void,
) => {
  if (!id) return null;
  //console.log("🚀 ~ id:", id);

  const dataRef = doc(FirebaseDB, FIREBASE_KEY, id);

  return onSnapshot(
    dataRef,
    (snapshot) => {
      //console.log("🚀 ~ snapshot:", snapshot);
      if (snapshot.exists()) {
        const data = snapshot.data() as any;
        // const department = await departmentService.getById(data.idDepartment)

        //console.log("🚀 ~ REALTIME DATA:", data);

        callback({ ...data, id: snapshot.id } as any);
      } else {
        callback(null);

        // useanyStore.getState().clearany();
      }
    },
    (error) => {
      console.error("Error getting real-time document:", error);
      onError?.(error);
    },
  );
};

const create = async (data: any) => {
  try {
    const document = await addDoc(
      collection(FirebaseDB, FIREBASE_KEY),
      data,
    );
    return document.id;
  } catch (e: any) {
    console.log("🚀 ~ create ~ e:", e);
    throw e;
  }
};

const update = async (data: Partial<any>) => {
  if (!data.id) return;

  try {
    await updateDoc(doc(FirebaseDB, FIREBASE_KEY, data.id), data);
    return data.id;
  } catch (e: any) {
    console.log("🚀 ~ create ~ e:", e);
    throw e;
  }
};

export default {
  getAll,
  getById,
  getByIdRealtime,
  create,
  update,
};
