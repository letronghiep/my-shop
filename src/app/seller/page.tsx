"use client";
import Notification from "@/components/Notification";
import TodoList from "@/components/seller/TodoList";
// import ShopLayout from "@/layouts/shop-layout";
import dynamic from "next/dynamic";
type Props = {};

function ShopPage({}: Props) {
  return (
    <div className="grid grid-cols-12 gap-x-3">
      <TodoList className="col-span-8" />
      <Notification className="col-span-4" notifications={[]} />
    </div>
  );
}

export default ShopPage;
