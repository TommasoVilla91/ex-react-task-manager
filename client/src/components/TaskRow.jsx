import React from "react";
import { Link } from "react-router-dom";

function TaskRow({t}) {

    return (
        <>
            <tbody>
                <tr key={t.id}>
                    <td><Link to={`/tasks/${t.id}`}>{t.title}</Link></td>
                    <td style={{
                        backgroundColor: t.status === "To do" ? "red" :
                            t.status === "Doing" ? "yellow" : "green"
                    }}>
                        {t.status}
                    </td>
                    <td>{new Date(t.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                </tr>
            </tbody>
        </>
    );
};

export default React.memo(TaskRow);