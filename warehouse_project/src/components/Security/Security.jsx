import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Form1 from "./Form1";
import Form2 from "./Form2";

export default function Security() {
  const [showForm, setShowForm] = useState(false);
  const [showForm2,setShowForm2]=useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };
  const handleAddClick2 = () => {
    setShowForm2(true);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Category</h2>
            <p>Add, Update and Manage Category</p>
          </div>

          <div className="flex flex-col gap-1">
            <Button onClick={handleAddClick} variant="outline">
              Add
            </Button>
            <Button variant="outline">Display</Button>
          </div>
        </div>

        {showForm && <Form1 setShowForm={setShowForm} />}
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Product</h2>
            <p>Add, Update and Manage Product</p>
          </div>
          <div className="flex flex-col gap-1">
            <Button onClick={handleAddClick2} variant="outline">Add</Button>

            <Button variant="outline">Display</Button>
          </div>
        </div>
        {showForm2 && <Form2 setShowForm2={setShowForm2} />}
      </div>
    </div>
  );
}
