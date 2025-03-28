import Navbar from "@/components/common/Navbar"
import Head from "next/head"
import { Poppins } from "next/font/google"

import Spinner from "@/components/common/Spinner"
import AdminDictionary from "@/components/admin/AdminDictionary"

import { useUser } from "@auth0/nextjs-auth0/client"
import AdminMenu from "@/components/admin/admin-menu"
import FloatingChatbot from "@/components/common/FloatingChatbot";


const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

const AdminPage = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <Spinner />

  if (error) return <div>{error.message}</div>

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <div className={`${poppins.className} min-h-screen bg-box`}>
        <FloatingChatbot />
        <Navbar />
        {user?.nickname !== "admin" ? (
          <div className='bg-red-500 text-white text-center py-2'>
            You are not authorized to access this page
          </div>
        ) : (
          <>
            <AdminMenu />
            <div className='container mx-auto px-4'>
              <div className='relative flex flex-col items-center rounded-[20px] mx-auto p-4 bg-white bg-clip-border shadow-md mb-6 mt-12'>
                <div className='relative flex h-32 w-full justify-center rounded-xl bg-cover'>
                  <div
                    className={
                      "bg-gradient-to-bl from-[#fbd34d] to-[#f6e27a] h-32 w-full rounded-lg flex items-center justify-center"
                    }
                  >
                    <h1 className='text-2xl font-semibold'>Admin Dashobard</h1>
                  </div>
                </div>
                <AdminDictionary />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminPage
