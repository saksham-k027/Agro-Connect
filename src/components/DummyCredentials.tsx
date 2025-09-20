import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Tractor, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DummyCredentials = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const credentials = [
    {
      type: "Consumer",
      icon: <User className="h-5 w-5" />,
      color: "bg-blue-500",
      accounts: [
        { email: "consumer@agroconnect.com", password: "consumer123", name: "John Consumer" },
        { email: "buyer@agroconnect.com", password: "buyer123", name: "Sarah Buyer" }
      ]
    },
    {
      type: "Farmer",
      icon: <Tractor className="h-5 w-5" />,
      color: "bg-green-500", 
      accounts: [
        { email: "farmer@agroconnect.com", password: "farmer123", name: "Raj Farmer" },
        { email: "provider@agroconnect.com", password: "provider123", name: "Priya Provider" }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Demo Login Credentials</h3>
        <p className="text-sm text-gray-600">Use these credentials to test different user roles</p>
      </div>
      
      {credentials.map((cred) => (
        <Card key={cred.type} className="border-l-4" style={{ borderLeftColor: cred.color.replace('bg-', '#') }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className={`p-1.5 rounded-full ${cred.color} text-white`}>
                {cred.icon}
              </div>
              {cred.type} Accounts
              <Badge variant="outline" className="ml-auto">
                {cred.accounts.length} accounts
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cred.accounts.map((account, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-700">{account.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {cred.type.toLowerCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between bg-white rounded px-2 py-1.5 border">
                    <span className="text-xs text-gray-600">Email:</span>
                    <div className="flex items-center gap-1">
                      <code className="text-xs font-mono">{account.email}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(account.email, "Email")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded px-2 py-1.5 border">
                    <span className="text-xs text-gray-600">Password:</span>
                    <div className="flex items-center gap-1">
                      <code className="text-xs font-mono">{account.password}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(account.password, "Password")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
        <div className="flex items-start gap-2">
          <div className="bg-yellow-500 text-white rounded-full p-1 mt-0.5">
            <span className="text-xs font-bold">!</span>
          </div>
          <div className="text-xs text-yellow-800">
            <p className="font-medium mb-1">How it works:</p>
            <ul className="space-y-1 text-yellow-700">
              <li>• <strong>Consumer login</strong> → Redirects to main AgroConnect marketplace</li>
              <li>• <strong>Farmer login</strong> → Redirects to Farmer Dashboard with management tools</li>
              <li>• Click copy buttons to easily use credentials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyCredentials;