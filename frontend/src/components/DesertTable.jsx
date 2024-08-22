/* eslint-disable react/prop-types */
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

];

const DessertTable = ({ title, href, dateTime }) => {
    return (
        <div className="container mx-auto my-8">
            <div className="m-5">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-5 text-left">S.No</th>
                            <th className="py-3 px-5 text-left w-2/3">Title</th>
                            <th className="py-3 px-5 text-left">Date</th>
                            <th className="py-3 px-5 text-left">Download</th>

                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((val, key) => {
                            return (
                                <tr key={key} className="bg-gray-700 border-b border-gray-600">
                                    <td className="py-3 px-5">1</td>
                                    <td className="py-3 px-5">{title}</td>
                                    <td className="py-3 px-5">{dateTime}</td>
                                    <td className="py-3 px-5">
                                        <button>
                                            <a href={href} target="_blank">Download</a>
                                        </button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default DessertTable;
