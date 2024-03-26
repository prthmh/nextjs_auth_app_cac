export default function UserProfile({ params }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1>Profile</h1>
        <p>Profile Page of {params.id} </p>
      </div>
    </div>
  );
}
