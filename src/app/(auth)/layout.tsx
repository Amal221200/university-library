import Image from 'next/image'
import React from 'react'

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='auth-container'>
            <section className="auth-form">
                <div className="auth-box">
                    <div className="flex flex-row gap-5">
                        <Image src="/icons/logo.svg" alt="Logo" width={37} height={37} />
                        <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
                    </div>

                    <div>{children}</div>
                </div>
            </section>
            <section className="auth-illustration">
                <Image src="/images/auth-illustration.png" alt="auth illustration" width={1000} height={1000} className="object-cover size-full" />
            </section>
        </main>
    )
}

export default AuthLayout