import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Camera,
  MapPin,
  Shield,
  MessageCircle,
  Home,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Messages } from "@/components/Messages";
import { useToast } from "@/hooks/use-toast";
import { useUserListings } from "@/hooks/useUserListings";
import EditListingDialog from "@/components/EditListingDialog";
import { Property } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const {
    userListings,
    loading: listingsLoading,
    error: listingsError,
    deleteListing,
    updateListing,
  } = useUserListings();

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: session?.user?.email || "user@example.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    bio: "I love traveling and experiencing new cultures. I'm a clean and respectful guest.",
    profileImage: "",
  });

  const [editingListing, setEditingListing] = useState<Property | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved.",
    });
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle editing a listing
  const handleEditListing = (listing: Property) => {
    setEditingListing(listing);
    setIsEditDialogOpen(true);
  };

  // Handle deleting a listing - open confirmation dialog
  const handleDeleteClick = (listingId: string) => {
    setListingToDelete(listingId);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (listingToDelete) {
      deleteListing(listingToDelete);
      setIsDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  };

  // Mock conversations for demo purposes
  const conversations = [
    {
      id: 1,
      name: "Mark Wilson",
      lastMessage: "Is the property still available?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastMessage: "Thanks for your response!",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 3,
      name: "Airbnb Support",
      lastMessage: "Your listing has been approved",
      time: "3 days ago",
      unread: false,
    },
  ];

  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User size={16} />
            <span>Personal Info</span>
          </TabsTrigger>
          <TabsTrigger value="listings" className="flex gap-2 items-center">
            <Home size={16} />
            <span>My Listings</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex gap-2 items-center">
            <MessageCircle size={16} />
            <span>Messages</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Shield size={16} />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and how we can reach you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About me</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell others about yourself..."
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSaveProfile}>Save changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>
                  This is how others will recognize you
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={profileData.profileImage} />
                  <AvatarFallback>
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <div className="relative">
                  <Input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("profile-image")?.click()
                    }
                    className="flex gap-2 items-center"
                  >
                    <Camera size={16} />
                    <span>Upload photo</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New My Listings Tab */}
        <TabsContent value="listings">
          {!session ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">
                Sign in to view your listings
              </h3>
              <p className="text-gray-600">
                You need to be signed in to manage your property listings
              </p>
            </div>
          ) : listingsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <Skeleton className="h-32 w-32 rounded-md mr-4" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : listingsError ? (
            <div className="flex items-center justify-center py-8">
              <AlertCircle className="text-red-500 mr-2" />
              <p>Error loading your listings. Please try again later.</p>
            </div>
          ) : userListings.length === 0 ? (
            <div className="text-center py-12">
              <Home className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't created any property listings yet.
              </p>
              <Button>Add Your First Listing</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Your Properties ({userListings.length})
                </h2>
                <Button>Add New Listing</Button>
              </div>

              <div className="grid gap-6">
                {userListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{listing.title || listing.name}</span>
                        <div className="text-sm font-normal bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Active
                        </div>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                        </div>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-32 h-32">
                          <img
                            src={listing.images?.[0] || "/placeholder.svg"}
                            alt={listing.title || listing.name || "Property"}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>

                        <div className="flex flex-col justify-between py-1">
                          <div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {listing.description || "No description provided"}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                              <span>${listing.price}/night</span>
                              <span>
                                {listing.bedrooms} bed
                                {listing.bedrooms !== 1 ? "s" : ""}
                              </span>
                              <span>
                                {listing.baths} bath
                                {listing.baths !== 1 ? "s" : ""}
                              </span>
                              <span>
                                Max {listing.maxGuests} guest
                                {listing.maxGuests !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {listing.amenities
                              ?.slice(0, 3)
                              .map((amenity, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs"
                                >
                                  {amenity}
                                </span>
                              ))}
                            {listing.amenities &&
                              listing.amenities.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs">
                                  +{listing.amenities.length - 3} more
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        ID: {listing.id.substring(0, 8)}...
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex gap-1"
                          onClick={() => handleEditListing(listing)}
                        >
                          <Pencil size={14} />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex gap-1"
                          onClick={() => handleDeleteClick(listing.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages">
          {activeConversation === null ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {conversations.map((convo) => (
                        <li
                          key={convo.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 ${
                            convo.unread ? "font-medium" : ""
                          }`}
                          onClick={() => setActiveConversation(convo.id)}
                        >
                          <div className="flex justify-between">
                            <span>{convo.name}</span>
                            <span className="text-xs text-gray-500">
                              {convo.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {convo.lastMessage}
                          </p>
                          {convo.unread && (
                            <div className="inline-block bg-red-500 w-2 h-2 rounded-full mt-1"></div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2 flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Select a conversation to view messages
                </p>
              </div>
            </div>
          ) : (
            <Card className="h-[500px]">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {
                      conversations.find((c) => c.id === activeConversation)
                        ?.name
                    }
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveConversation(null)}
                  >
                    Back to conversations
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 h-[calc(500px-5.5rem)]">
                <Messages />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Update password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Listing Dialog */}
      {editingListing && (
        <EditListingDialog
          listing={editingListing}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onUpdate={updateListing}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this listing?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default ProfilePage;
