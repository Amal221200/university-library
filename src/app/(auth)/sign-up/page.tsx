"use client"
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

function SignUpPage() {
  return (
    <AuthForm type="SIGN_UP" schema={signUpSchema} defaultValues={{ fullName: "", email: "",  universityId: 0, password: "", universityCard: "" }} onSubmit={()=> {}} />
  )
}

export default SignUpPage