import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ImageUploader = ({ onUploadSuccess }: { onUploadSuccess: (url: string) => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'suioncampus'); // Set this to your Cloudinary upload preset
    formData.append('cloud_name', 'georgegoldman'); // Your Cloudinary cloud name

    try {
      setLoading(true);
      const response = await fetch('https://api.cloudinary.com/v1_1/georgegoldman/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        onUploadSuccess(data.secure_url); // Pass the image URL back to the parent component
        toast({
          title: 'Image uploaded successfully!',
          description: 'Your image has been uploaded to Cloudinary.',
        });
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (err) {
      console.log(err)
      setError('Failed to upload image.');
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUploader;
