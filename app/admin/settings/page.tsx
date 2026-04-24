"use client"

import { 
  Shield, 
  Lock, 
  Database, 
  Globe, 
  Bell, 
  Save,
  Server,
  Cloud
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const handleSave = () => {
    toast.success("System settings updated successfully")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">System Settings</h1>
        <p className="text-slate-400 mt-1">Global configuration for the voting platform.</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-900 border-white/5">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Authentication & Security
            </CardTitle>
            <CardDescription className="text-slate-500">Configure how users access the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-200">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-500">Require 2FA for all administrative accounts.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-200">Session Timeout</Label>
                <p className="text-sm text-slate-500">Automatically logout inactive users after 30 minutes.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-200">Social Login (OAuth)</Label>
                <p className="text-sm text-slate-500">Enable Google and GitHub authentication.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-white/5">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-500" />
              Database & Storage
            </CardTitle>
            <CardDescription className="text-slate-500">Manage data persistence and backups.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs uppercase">Main Database</Label>
                <div className="flex items-center gap-2 p-3 bg-slate-950 border border-white/5 rounded-lg text-sm text-slate-400">
                  <Server className="h-4 w-4" />
                  Primary-Instance-v1 (Active)
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs uppercase">Media Storage</Label>
                <div className="flex items-center gap-2 p-3 bg-slate-950 border border-white/5 rounded-lg text-sm text-slate-400">
                  <Cloud className="h-4 w-4" />
                  Vercel Blob Storage
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-slate-300">
              Run Database Maintenance
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-white/5">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              Notifications
            </CardTitle>
            <CardDescription className="text-slate-500">Configure global alert systems.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-200">Email Alerts</Label>
                <p className="text-sm text-slate-500">Send confirmation emails to voters.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
               <Label className="text-slate-300">Admin Notification Email</Label>
               <Input className="bg-slate-950 border-white/10 text-slate-100" defaultValue="alerts@securevote.com" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
