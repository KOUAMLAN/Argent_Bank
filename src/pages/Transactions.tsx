import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: string;
  category: string;
  notes: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "27/02/20",
    description: "Golden Sun Bakery",
    amount: 8,
    balance: 298,
    type: "Electronic",
    category: "Food",
    notes: "",
  },
  {
    id: "2",
    date: "27/02/20",
    description: "Golden Sun Bakery",
    amount: 8,
    balance: 298,
    type: "Electronic",
    category: "Food",
    notes: "",
  },
];


const ACCOUNTS_DATA: Record<
  string,
  {
    title: string;
    amount: string;
    description: string;
  }
> = {
  "1": {
    title: "Argent Bank Checking (x3448)",
    amount: "$48,098.43",
    description: "Available Balance",
  },
  "2": {
    title: "Argent Bank Savings (x6712)",
    amount: "$48,098.43",
    description: "Available Balance",
  },
  "3": {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$48,098.43",
    description: "Current Balance",
  },
};


const Transactions: React.FC = () => {

  const { accountId } =
    useParams<{ accountId: string }>();

  const navigate = useNavigate();


  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);


  const [openTransactionId, setOpenTransactionId] =
    useState<string | null>(null);


  const [editingCategory, setEditingCategory] =
    useState<{
      id:string;
      value:string;
    } | null>(null);


  const [editingNote, setEditingNote] =
    useState<{
      id:string;
      value:string;
    } | null>(null);



  const account =
    accountId && ACCOUNTS_DATA[accountId]
      ? ACCOUNTS_DATA[accountId]
      : {
          title:"Account",
          amount:"$0.00",
          description:"Balance",
        };



  const categories = [
    "Food",
    "Housing",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Utilities",
  ];



  const toggleTransaction = (id:string) => {

    setOpenTransactionId(
      openTransactionId === id
        ? null
        : id
    );

  };



  const saveCategory = (id:string) => {

    if(!editingCategory) return;


    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id
          ? {
              ...tx,
              category:editingCategory.value,
            }
          : tx
      )
    );


    setEditingCategory(null);

  };



  const saveNote = (id:string) => {

    if(!editingNote) return;


    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id
          ? {
              ...tx,
              notes:editingNote.value,
            }
          : tx
      )
    );


    setEditingNote(null);

  };



return (

<main
className="
flex-1
min-h-screen
bg-white
pb-10
"
>


<section
className="
px-4
pt-6
"
>

<div
className="
max-w-[1000px]
mx-auto
bg-[#343a40]
text-white
rounded-md
shadow-sm
p-6
relative
text-center
"
>


<p className="text-lg">
{account.title}
</p>


<p className="
text-3xl
md:text-4xl
font-bold
my-2
">
{account.amount}
</p>


<p>
{account.description}
</p>



<button
type="button"
onClick={()=>navigate("/profile")}
className="
absolute
right-3
top-3
text-white
hover:text-[#00bc77]
"
aria-label="Retour profil"
>

<i className="fa-solid fa-xmark text-3xl"/>

</button>


</div>

</section>




<section
className="
max-w-[1000px]
mx-auto
px-4
mt-8
"
>


<div
className="
hidden
md:grid
grid-cols-[15%_40%_20%_20%_5%]
font-bold
uppercase
text-sm
p-4
border-b
"
>

<span>Date</span>
<span>Description</span>
<span>Amount</span>
<span>Balance</span>
<span/>

</div>




{transactions.map(tx=>{

const opened =
openTransactionId === tx.id;



return (

<div
key={tx.id}
className="
mb-3
rounded
overflow-hidden
"
>


<button
type="button"
onClick={()=>toggleTransaction(tx.id)}
className={`
w-full
text-left
text-white
bg-[#00bc77]
hover:bg-[#009e60]
transition
p-4
grid
grid-cols-1
md:grid-cols-[15%_40%_20%_20%_5%]
gap-3
items-center
`}
>


<div className="flex justify-between">
<b className="md:hidden">
Date
</b>

<span>
{tx.date}
</span>

</div>



<div className="flex justify-between">
<b className="md:hidden">
Description
</b>

<span>
{tx.description}
</span>

</div>



<div className="flex justify-between">
<b className="md:hidden">
Amount
</b>

<span>
${tx.amount.toFixed(2)}
</span>

</div>



<div className="flex justify-between">
<b className="md:hidden">
Balance
</b>

<span>
${tx.balance.toFixed(2)}
</span>

</div>


<i
className={`
fa-solid
fa-chevron-up
transition-transform
${opened ? "" : "rotate-180"}
`}
/>


</button>





{opened && (

<div
className="
bg-[#00bc77]
text-white
p-5
space-y-4
"
onClick={(e)=>e.stopPropagation()}
>


<p>
<b>Transaction Type:</b>{" "}
{tx.type}
</p>




<div className="flex flex-wrap gap-2 items-center">

<b>
Category:
</b>


{editingCategory?.id === tx.id ? (

<>

<select
value={editingCategory.value}
onChange={(e)=>
setEditingCategory({
id:tx.id,
value:e.target.value
})
}
className="
text-black
rounded
p-1
"
>

{categories.map(cat=>(

<option key={cat}>
{cat}
</option>

))}

</select>


<button
type="button"
onClick={()=>saveCategory(tx.id)}
className="
bg-white
text-[#00bc77]
px-3
rounded
"
>
OK
</button>

</>


):(


<>

<span>
{tx.category}
</span>


<button
type="button"
onClick={()=>
setEditingCategory({
id:tx.id,
value:tx.category
})
}
>

<i className="fa-solid fa-pencil"/>

</button>

</>

)}


</div>




<div className="flex flex-wrap gap-2 items-center">

<b>
Notes:
</b>


{editingNote?.id === tx.id ? (

<>

<input
value={editingNote.value}
onChange={(e)=>
setEditingNote({
id:tx.id,
value:e.target.value
})
}
className="
text-black
rounded
p-1
"
/>


<button
type="button"
onClick={()=>saveNote(tx.id)}
className="
bg-white
text-[#00bc77]
px-3
rounded
"
>
OK
</button>

</>


):(


<>

<span>
{tx.notes || "Lorem ipsum"}
</span>


<button
type="button"
onClick={()=>
setEditingNote({
id:tx.id,
value:tx.notes
})
}
>

<i className="fa-solid fa-pencil"/>

</button>

</>

)}

</div>



</div>

)}


</div>

);

})}


</section>


</main>

);

};


export default Transactions;