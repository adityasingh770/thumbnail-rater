'use client';

import { SignInButton, SignOutButton, useSession } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const { isSignedIn } = useSession();
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  return (
    <main className="">
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const title = formData.get('title') as string;

            // TODO: pass the data to our mutation createThumbnails
            await createThumbnail({
              title,
            });
            form.reset();
          }}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" className="text-black" />
          <button>Create</button>
        </form>
      )}
    </main>
  );
}
