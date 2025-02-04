import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiaSitemapSolid } from "react-icons/lia";
import Order from "../Tables/orderDetial";

export function OrderDialog({ action, order }) {
  return (
    <Dialog className="overflow-y-auto">
      <DialogTrigger asChild>
        <button className="flex bg-gray-200 p-2 rounded-lg "> {action}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-screen  overflow-y-auto overflow-x-auto">
        <DialogHeader>
          {/* <DialogTitle>Add Item</DialogTitle> */}
          {/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
        </DialogHeader>
        {/* <AddItemForm /> */}
        <Order order={order} />
        {/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
