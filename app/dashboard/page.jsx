
export default function Home() {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    router.push('/dashboard');
    return <div>Redirecting...</div>;
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("signed in with popup.")
    console.log(credential)
    console.log(token)
    console.log(user)

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={signIn} className="p-4 bg-blue-500 text-white rounded-lg">
        Sign in with Google
      </button>
    </main>
  );
}