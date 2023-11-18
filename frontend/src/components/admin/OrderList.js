import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/OrderActions";
import { clearOrderDeleted, clearOrderError } from "../../slices/OrderSlice";

export default function OrderList() {
    const { adminOrders=[], loading=true, error, isOrderDeleted } = useSelector(state => state.orderState)
    const dispatch = useDispatch();

    const setOrders = () =>{
        const data = {
            columns :[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Number of items',
                    field:'noOfItems',
                    sort:'asc'
                },
                {
                    label:'Amount',
                    field:'amount',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                },
            ],
            rows:[]
        }
        adminOrders.forEach(order => {
            data.rows.push({
                id:order._id,
                noOfItems: order.orderItems.length,
                amount:'$'+order.totalPrice,
                status: <p style={{color:order.orderStatus.includes('Delivered')?'green': order.orderStatus.includes('Shipped')?'blue':'red'}}>{order.orderStatus}</p>,
                actions:(
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        });
        return data;
    }
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    } 

    useEffect(()=>{
        if(error){
            toast(error,{
              position:"bottom-center",
              type: 'error',
              onOpen:()=>{dispatch(clearOrderError())}
          })
          return;
          }
          if(isOrderDeleted){
            toast('Order deleted successfully',{
              type:"success",
              position:"bottom-center",
              onOpen: ()=> {dispatch(clearOrderDeleted())}
          })
          return;
        }
          dispatch(adminOrdersAction)
    },[error, dispatch, isOrderDeleted])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
            <div className="col-12 col-md-10">
                    <h1 className="my-4">Order List</h1>
                     <Fragment>
                    {
                        loading ?<Loader/>:
                        <MDBDataTable
                        data={setOrders()}
                        bordered
                        striped
                        hover
                        className="px-3"
                        />
                    }
                     </Fragment>
                </div>
            </div>
        </div>
    )
}