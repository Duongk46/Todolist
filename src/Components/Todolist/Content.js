import React, {  useState, useEffect } from 'react';
import './Content.scss';
import { collection, getDocs, getDoc, addDoc, query, orderBy, doc, updateDoc,deleteDoc } from "@firebase/firestore";
import { db } from '../../firebase';
import { async } from '@firebase/util';
import { formatDate, formatTime } from './Format';
import Menu from './Menu';
import checkSubmitForm from './CheckForm';
function Content() {
    let count = 0;
    const [todo, setTodo] = useState([]);
    const ref = collection(db, "Todolist");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [id, setId] = useState(0);
    const [nameTodo, setNameTodo] = useState("");
    const [descriptionTodo, setDescriptionTodo] = useState("");
    const [statusTodo, setStatusTodo] = useState(false);
    const [objectId, setObjectId] = useState("");
    const [edit,setedit] = useState(0);

    
    useEffect(() => {
        const getTodolist = async () => {
            const data = await getDocs(query(ref, orderBy('Id', 'desc')));
            let max = 0; 
            data.docs.map((doc) => {
                if (doc.data().Id > max)
                    max = doc.data().Id;
            });
            setTodo(data.docs.map((doc) => ({ ...doc.data(), objectId: doc.id })));
            setId(max + 1);
            const test = document.getElementById("add-form");
            test.style.display = 'block';
        }
        getTodolist();
    }, [id,edit]);
    const handleCheckSubmitForm = () => {
        checkSubmitForm();
    }
    const handleAddForm = (e) => {
        e.preventDefault();
        createTodo();
        alert('Thêm công việc thành công');
    }
    const createTodo = async () => {
        const today = formatDate() + "  " + formatTime();
        await addDoc(ref, { Id: id, Name: name, Description: description, CreatedDate: today, Status: status });
        setId(id + 1);
        setName("");
        setDescription("");
        setStatus(false);
    };
    const handleEdit = (objectId) => {
        const data = getData(objectId);
    }
    const getData = async (objectId) => {
        setObjectId(objectId);
        const data = await getDoc(doc(ref, objectId));
        setDescriptionTodo(data.data().Description);
        setNameTodo(data.data().Name);
        setStatusTodo(data.data().Status);

    }
    const updateTodo = async (e) => {
        e.preventDefault();
        const dbTodo = doc(ref, objectId);
        await updateDoc(dbTodo, { Name: nameTodo, Description: descriptionTodo, Status: statusTodo });
        setedit(edit+1);
        alert('Cập nhật công việc thành công');
    }
    const handleDelete = (objectId) => {
        setObjectId(objectId);
    }
    const handleDeleteTodo = async() => {
        const dbTodo = doc(ref, objectId);
        await deleteDoc(dbTodo);
        alert("xóa công việc thành công");
        setId(id-1);
    }
    
    return (
        <div className='body'>
            <Menu />
            <h1 className='mb-5'>Danh sách <span>công việc</span></h1>
            <div className='container container-col-mid'>
                {todo.map((item) => {
                    let timeline;
                    let first, second;
                    if (count % 2 == 0) {
                        timeline = 'timeline-block timeline-block-right ml-2';

                        first = <span onClick={() => { handleEdit(item.objectId) }}><i className='fa-solid fa-pen color-pen' data-bs-toggle='modal' data-bs-target='#editModal' ></i></span>;
                        if (item.Status == true)
                            second = <i className='fa-solid fa-check color-check' ></i>
                        else
                            second = <i className='fa-solid fa-xmark color-close' ></i>
                    } else {
                        timeline = 'timeline-block timeline-block-left';
                        if (item.Status == true)
                            first = <i className='fa-solid fa-check color-check' ></i>;
                        else
                            first = <i className='fa-solid fa-xmark color-close' ></i>;
                        second = <span onClick={() => { handleEdit(item.objectId) }}><i className='fa-solid fa-pen color-pen' data-bs-toggle='modal' data-bs-target='#editModal' ></i></span>;
                    }
                    count = count + 1;
                    return (
                        <div className={timeline}>
                            <div className='marker' />
                            <div className='timeline-content'>
                                <h3 className='txt-todolist'>{item.Name}</h3>
                                <span>{item.CreatedDate}</span>
                                <p className='txt-todolist'>
                                    {item.Description}
                                </p>
                                <div className='tool-todolist'>
                                    {first}
                                    <span onClick={() => {handleDelete(item.objectId)}}><i className='fa-solid fa-trash color-trash' data-bs-toggle="modal" data-bs-target="#deleteTodo" ></i></span>
                                    {second}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Tạo công việc
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body" id='add-form'>
                            <form className='row g-3 needs-validation' id='submit-form' noValidate onSubmit={handleAddForm}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >
                                        Tên công việc:
                                    </label>
                                    <input type="text" className="form-control" id="validationCustom01" value={name} required onChange={(e) => { setName(e.target.value) }}
                                    />
                                    <div class="invalid-feedback" >
                                        Vui lòng chọn tên công việc
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">
                                        Nội dung:
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="message-text"
                                        defaultValue={""}
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="validationCustom02" checked={(status === true ? true : false)} onChange={(e) => {
                                        setStatus(e.target.checked)
                                    }}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">
                                        Xác nhận trạng thái
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Đóng
                                    </button>
                                    <button onClick={handleCheckSubmitForm} type="submit" className="btn btn-primary">
                                        Xác nhận
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="editModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Sửa công việc
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body" id='add-form'>
                            <form className='row g-3' id='submit-form'>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" >
                                        Tên công việc:
                                    </label>
                                    <input type="text" className="form-control" value={nameTodo} onChange={(e) => { setNameTodo(e.target.value) }}
                                    />
                                    <div class="invalid-feedback" >
                                        Vui lòng chọn tên công việc
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">
                                        Nội dung:
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="message-text"
                                        defaultValue={""}
                                        value={descriptionTodo}
                                        onChange={(e) => { setDescriptionTodo(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" checked={(statusTodo === true ? true : false)} onChange={(e) => {
                                        setStatusTodo(e.target.checked)
                                    }}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">
                                        Xác nhận trạng thái
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Đóng
                                    </button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateTodo}>
                                        Xác nhận
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal fade" id="deleteTodo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa công việc</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc là muốn xóa công việc này?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteTodo}> Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Content;