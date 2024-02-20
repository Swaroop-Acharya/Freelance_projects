import React from "react";
import { Button } from "@/components/ui/button";
import { Routes ,Link,Route} from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";

export default function Security() {
  return (
    <div className="flex justify-center mt-8">
      <div className="w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Category</h2>
            <p>Add, Update and Manage Category</p>
          </div>

          <div className="flex flex-col gap-1">
            <Link to="/form1">
              <Button variant="outline">Add</Button>
            </Link>
            <Button variant="outline">Display</Button>
          </div>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Product</h2>
            <p>Add, Update and Manage Product</p>
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/form2">
              <Button variant="outline">Add</Button>
            </Link>
            <Button variant="outline">Display</Button>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
      </Routes>
    </div>
  );
}
