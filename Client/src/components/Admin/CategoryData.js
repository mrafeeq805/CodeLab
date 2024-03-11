import React from 'react'

const CategoryData = ({categoryList,setShowDelete,setId,setName}) => {
    const list = [
        "#","Title","Main Domain","Projects","Status","Action"
    ]
  return (
    <div>
        <table className="w-full border-separate border-spacing-y-3">
					<tr className="text-left border-b-2 ">
						{list.map((item) => (
							<th className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item}</span>
							</th>
						))}
					</tr>
					{categoryList?.map((item, index) => (
						<tr className="text-left border-b-2 ">
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{index + 1}</span>
							</td>
							
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.title}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.main_category}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.project_count}</span>
							</td>
							
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.status}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<div className="flex gap-4">
									<button>
										<i class="bi bi-pencil-fill text-primary text-xl"></i>
									</button>
									<button onClick={ () => {
                                        setShowDelete(true)
                                        setId(item._id)
                                        setName(item.title)
                                    }
                                    } >
										<i class="bi bi-trash3-fill text-red-500 text-xl"></i>
									</button>
								</div>
							</td>
						</tr>
					))}
				</table>
    </div>
  )
}

export default CategoryData