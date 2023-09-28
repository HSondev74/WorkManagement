import React from "react";

export default function Test() {
     console.log(import.meta.env.VITE_MONEY); // ra 123 theo file .env
     console.log(import.meta.env.DB_PASS); //ra undefined
     console.log(import.meta.env.VITE_MONEY1); //SỐ
     console.log(import.meta.env.VITE_MONEY2); //SỐ\123
     console.log(import.meta.env.VITE_MONEY3); //SỐ123
     return <div></div>;
}
