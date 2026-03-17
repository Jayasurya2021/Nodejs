

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
        >
          {loading ? "Creating..." : "Create your Amazon account"}
        </button>
      </form>
    </div>
  )
}

export default Register
