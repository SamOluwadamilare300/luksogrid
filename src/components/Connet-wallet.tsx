'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'


function Connect() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 my-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Account</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 font-medium">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              account.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {account.status}
            </span>
          </div>
          
          {account.addresses && account.addresses.length > 0 && (
            <div className="flex flex-col mb-2">
              <span className="text-gray-500 font-medium">Address:</span>
              <span className="text-gray-800 text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto mt-1">
                {account.addresses[0]}
              </span>
            </div>
          )}
          
          {account.chainId && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Chain ID:</span>
              <span className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                {account.chainId}
              </span>
            </div>
          )}
        </div>

        {account.status === 'connected' && (
          <button 
            type="button" 
            onClick={() => disconnect()}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Connect Wallet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              disabled={status === 'pending' || status === 'success'}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'pending' ? 'Connecting...' : connector.name}
            </button>
          ))}
        </div>
        
        {status && status !== 'idle' && (
          <div className="text-sm text-gray-600 mb-2">
            Status: <span className="font-medium">{status}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
            {error.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Connect
