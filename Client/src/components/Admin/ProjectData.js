import React from 'react'

const ProjectData = ({projectList,setShowData,setId,setShowDelete}) => {
    const list = [
		"#",
		"ID",
		"Title",
		"Publisher",
		"Category",
		"Published Date",
		"Views",
		"Status",
		"Action",
	];
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
					{projectList?.map((item, index) => (
						<tr className="text-left border-b-2 ">
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{index + 1}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.project_id}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.title}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.publisher}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.category}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.published_date}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.views}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<span className="">{item.status}</span>
							</td>
							<td className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
								<div className="flex gap-4">
									<button onClick={() => {
                                        setShowData(true)
                                        setId(item.project_id)
                                    }}>
										<i class="bi bi-pencil-fill text-primary text-xl"></i>
									</button>
									<button onClick={() => {
                                        setShowDelete(true)
                                        setId(item.project_id)
                                    }}>
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

export default ProjectData