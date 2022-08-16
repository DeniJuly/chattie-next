import { getProviders, getSession, signIn } from 'next-auth/react';
import React from 'react';

function Signin({ providers }) {
  console.log("secret", process.env.JWT_SECRET);
  return (
    <main className="w-screen h-screen bg-black-sidebar flex items-center justify-center">
      {Object?.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="relative inline-block items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
          >
            <span className="w-48 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-black-sidebar opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-[65deg] -translate-x-56 -translate-y-24 bg-cream-bubble-chat opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-cream-bubble-chat transition-colors duration-200 ease-in-out group-hover:text-gray-900">
              Signin With {provider.name}
            </span>
            <span className="absolute inset-0 border-2 border-black-border rounded-full"></span>
          </button>
        </div>
      ))}
    </main>
  );
}

export default Signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: { providers: providers || [] },
  };
}
