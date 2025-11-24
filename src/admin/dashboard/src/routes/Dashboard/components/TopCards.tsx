import {Text} from "@medusajs/ui";

const TopCards = () => {
    return (
    <div className="gap-y-large flex flex-col">
      <div className=" 'p-4 gap-y-2xsmall flex flex-col">
        <h2 className="inter-xlarge-semibold">Sales</h2>
        <Text className="inter-base-regular text-grey-50">
          See the number of product sold and the number remaining in stock
        </Text>
      </div>
    
      <div className=" flex sm:flex-none gap-4 p-4">
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out border-l-[4px] border-[#1F2937]">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$7,845</p>
            <p className="text-gray-600">Quarterly Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-green-700 text-lg">+18%</span>
          </p>
        </div>
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out border-l-[4px] border-[#1F2937]">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$1,14,783</p>
            <p className="text-gray-600">YTD Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-green-700 text-lg">+11%</span>
          </p>
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out border-l-[4px] border-[#1F2937]">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">10,845</p>
            <p className="text-gray-600">Customers</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-green-700 text-lg">+17%</span>
          </p>
        </div>
      </div>
    </div>
    )
}