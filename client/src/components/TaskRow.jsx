import React from "react";

function TaskRow({t}) {

    return (
        <>
            <tbody>
                <tr key={t.id}>
                    <td>{t.title}</td>
                    <td style={{
                        backgroundColor: t.status === "To do" ? "red" :
                            t.status === "Doing" ? "yellow" : "green"
                    }}>
                        {t.status}
                    </td>
                    <td>{t.createdAt}</td>
                </tr>
            </tbody>
        </>
    );
};

export default React.memo(TaskRow);