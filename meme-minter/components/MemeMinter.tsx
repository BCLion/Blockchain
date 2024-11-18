'use client'

import { useState } from 'react'
import Draggable from 'react-draggable'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { parseEther } from 'ethers/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CONTRACT_ADDRESS = '0x...' // Replace with your actual contract address

const MemeMinter = () => {
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        name: 'mintMeme',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
          { internalType: 'string', name: 'topText', type: 'string' },
          { internalType: 'string', name: 'bottomText', type: 'string' },
        ],
        outputs: [],
      },
    ],
    functionName: 'mintMeme',
    args: [topText, bottomText],
    value: parseEther('0.01'), // Adjust the minting cost as needed
  })

  const { write: mintMeme, isLoading, isSuccess } = useContractWrite(config)

  return (
    <div className="relative w-[500px] h-[500px] border border-gray-300">
      <img src="/meme-template.jpg" alt="Meme template" className="w-full h-full object-cover" />
      
      <Draggable bounds="parent">
        <div className="absolute top-0 left-0 right-0 text-center">
          <Input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Top text"
            className="text-2xl font-bold text-white text-stroke-2"
          />
        </div>
      </Draggable>
      
      <Draggable bounds="parent">
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <Input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Bottom text"
            className="text-2xl font-bold text-white text-stroke-2"
          />
        </div>
      </Draggable>
      
      <Button
        onClick={() => mintMeme?.()}
        disabled={!mintMeme || isLoading}
        className="absolute bottom-4 right-4"
      >
        {isLoading ? 'Minting...' : 'Mint Meme'}
      </Button>
      
      {isSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded">
          Meme minted successfully!
        </div>
      )}
    </div>
  )
}

export default MemeMinter