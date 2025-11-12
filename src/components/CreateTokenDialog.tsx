import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Rocket, Wallet, AlertCircle } from "lucide-react";
import type { Token } from "../types/token";

type CreateTokenPayload = Pick<
  Token,
  "name" | "symbol" | "description" | "imageUrl" | "creator" | "price" | "priceChange24h"
>;

interface CreateTokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateToken: (token: CreateTokenPayload) => void;
}

export function CreateTokenDialog({
  open,
  onOpenChange,
  onCreateToken,
}: CreateTokenDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
  });
  const [isConnected, setIsConnected] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.description) {
      alert('Please fill in all required fields!');
      return;
    }

    const token: CreateTokenPayload = {
      ...formData,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
      creator: '0x' + Math.random().toString(16).substr(2, 8) + '...' + Math.random().toString(16).substr(2, 4),
      price: 0.00001,
      priceChange24h: 0,
    };

    onCreateToken(token);
    
    // Reset form
    setFormData({
      name: '',
      symbol: '',
      description: '',
      imageUrl: '',
    });
    setIsConnected(false);
  };

  const handleConnectWallet = () => {
    // Mock wallet connection
    setIsConnected(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Launch Your Meme Token
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Create your own token in seconds. No coding required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Wallet Connection */}
          {!isConnected ? (
            <Alert className="bg-purple-500/10 border-purple-500/30">
              <AlertCircle className="size-4 text-purple-400" />
              <AlertDescription className="text-white/70">
                Connect your wallet to launch a token
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-green-500/10 border-green-500/30">
              <Wallet className="size-4 text-green-400" />
              <AlertDescription className="text-white/70">
                Wallet connected: 0x742d...a3f1
              </AlertDescription>
            </Alert>
          )}

          {!isConnected && (
            <Button
              type="button"
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Wallet className="size-4 mr-2" />
              Connect Wallet
            </Button>
          )}

          {isConnected && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Token Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Moon Doge"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-white">Token Symbol *</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., MDOGE"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  maxLength={10}
                  required
                />
                <p className="text-xs text-white/50">Max 10 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell the world about your token... Make it spicy! 🌶️"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-24"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.png"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
                <p className="text-xs text-white/50">Leave empty for a default image</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <h4 className="text-white">Token Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/50">Initial Supply:</span>
                    <div className="text-white">1,000,000,000</div>
                  </div>
                  <div>
                    <span className="text-white/50">Network:</span>
                    <div className="text-white">Ethereum</div>
                  </div>
                  <div>
                    <span className="text-white/50">Decimals:</span>
                    <div className="text-white">18</div>
                  </div>
                  <div>
                    <span className="text-white/50">Launch Fee:</span>
                    <div className="text-white">0.1 ETH</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Rocket className="size-4 mr-2" />
                  Launch Token
                </Button>
              </div>

              <p className="text-xs text-white/50 text-center">
                By launching a token, you agree to our terms of service. This is a mock deployment for demonstration purposes.
              </p>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}