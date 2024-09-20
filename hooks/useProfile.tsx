import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function useProfile() {
    const [name, setName] = useState();

    const router = useRouter();

    useEffect(() => {
        const getName = async () => {
            const storedName = await SecureStore.getItemAsync("name");
            if (storedName) {
                setName(storedName);
            } else {
                router.replace("/");
            }
        };

        if (!name) {
            getName();
        }
    }, [name]);

    return { name }

}