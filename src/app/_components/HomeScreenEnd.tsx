"use cient";

export const HomeScreenEnd = () => {
  return (
    <>
      <div className="w-screen h-[280px] bg-indigo-700 mt-20 pt-10 flex flex-row justify-between pr-10 pl-10">
        <div>
          <div className="flex ">
            <img src="/film (1).png" className="" />
            <h1 className="text-white">Movie Z</h1>
          </div>
          <h1 className="text-white">© 2024 Movie Z. All Rights Reserved.</h1>
        </div>
        <div className="flex flex-row gap-10">
          <div className="flex gap-4 flex-col">
            <div>
              <h1 className="text-white">Contact information</h1>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail-icon lucide-mail">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <div className="flex flex-col">
                  <h1 className="text-white">Email:</h1>
                  <h2 className="text-white">support@movieZ.com</h2>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone-icon lucide-phone ">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
                <div className="flex flex-col">
                  <h1 className="text-white">Phone:</h1>
                  <h2 className="text-white">+976 (11) 123-4567</h2>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-white">Follow us</h1>
            <h2 className="text-white text-semibold">
              Facebook Instagram Twitter Youtube{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
