import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, AlertCircle } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:via-pink-900/20">
            <div className="text-center space-y-6 p-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-4 shadow-2xl">
                    <AlertCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Page Not Found
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go Back Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
