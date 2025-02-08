'use client'
import { SessionProvider } from "next-auth/react";
import { ImageKitProvider} from "imagekitio-next";
import { ReactNode } from 'react';

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/imagekit-auth");

        if (!response.ok) {
            const errorText = await response.text();
            console.log(`Request failed with status ${response.status}: ${errorText}`);
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        console.log("hello",signature, expire, token);
        return { signature, expire, token };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};



const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
        <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
            {children}
        </ImageKitProvider>
        </SessionProvider>

    );
};

export default Providers;