
import React, { useState } from 'react';
import { Twitter, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from "sonner";

const Footer = () => {
  const [contractCopied, setContractCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  
  const contractAddress = "0xabsurd...42069";
  const supportEmail = "ai@absurdity.wtf";
  
  const copyToClipboard = (text: string, type: 'contract' | 'email') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (type === 'contract') {
          setContractCopied(true);
          toast.success("Contract address copied!");
          setTimeout(() => setContractCopied(false), 2000);
        } else {
          setEmailCopied(true);
          toast.success("Email address copied!");
          setTimeout(() => setEmailCopied(false), 2000);
        }
      })
      .catch(err => {
        toast.error("Failed to copy: " + err.message);
      });
  };
  
  return (
    <footer className="bg-absurd-dark border-t border-gray-800 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-neon-blue font-pixel text-lg mb-4">AIbsurdity</h3>
          <p className="text-gray-400 text-sm mb-4 font-pixel">
            The most absurd AI-driven blockchain experiment in the multiverse.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/absurdity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://absurdity.wtf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-neon-green font-pixel text-lg mb-4">Roadmap</h3>
          <ul className="text-gray-400 text-sm space-y-2 font-pixel">
            <li>Epoch 1-2: Absurd Code Foundation</li>
            <li>Epoch 3-4: Mainstream Absurdification</li>
            <li>Epoch 5-6: Absurd Religious Movement</li>
            <li>Epoch 7-8: Global Dominance</li>
            <li>Epoch 9-10: Multiversal Comedy Singularity</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-neon-pink font-pixel text-lg mb-4">Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-gray-400 text-sm p-2 bg-gray-900 rounded font-pixel">
              <span>Contract:</span>
              <span className="flex items-center">
                {contractAddress}
                <button 
                  onClick={() => copyToClipboard(contractAddress, 'contract')} 
                  className="ml-2 hover:text-neon-blue transition-colors"
                >
                  {contractCopied ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                </button>
              </span>
            </div>
            
            <div className="flex items-center justify-between text-gray-400 text-sm p-2 bg-gray-900 rounded font-pixel">
              <span>Support:</span>
              <span className="flex items-center">
                {supportEmail}
                <button 
                  onClick={() => copyToClipboard(supportEmail, 'email')} 
                  className="ml-2 hover:text-neon-pink transition-colors"
                >
                  {emailCopied ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-500 text-xs font-pixel">
          © {new Date().getFullYear()} AIbsurdity. All rights absurdified. This is not financial advice—it's a joke with a blockchain.
        </p>
        <p className="text-center text-neon-orange text-sm mt-4 font-pixel animate-pulse">
          If nothing works out for us... we'll leave, but as a farewell we'll slam the door so hard that the world will tremble!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
