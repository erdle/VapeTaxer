import React, { Component } from 'react';
import { 
  GridComponent, 
  ColumnDirective, 
  ColumnsDirective,
  Page,
  Inject,
  Group,
  Sort,
  Edit,
  EditSettingsModel,
  Toolbar,
  ToolbarItems,
  CommandColumn 
} from '@syncfusion/ej2-react-grids';
import data from '../data/usersData.json';
import '../App.css';

function viewImage(props: any) {
    var src = props.Image;
    return (<div className='image round-image'>
        <img src={src} />
    </div>);
}

function viewUser(props: any) {
    return(<div className='btn_container'>
      <button><a href={"/Users/" + props.ID}>View User</a></button>
    </div>);
}

const Users: React.FC = () => {
    const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete'];
    const commands: any = [
                           { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
                           { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
                           { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
                        ];

    return (
      <div style={{ marginTop: '5%' }}>
        <GridComponent dataSource={data} 
            allowPaging={true}
            pageSettings={{ pageSize:6 }}
            allowFiltering={true}
            allowGrouping={true}
            allowSorting = {true}
            editSettings={editOptions}
            toolbar={toolbarOptions}
          >
          <ColumnsDirective>
            <ColumnDirective field='ID' headerText='ID' textAlign='Center' width='70' />
            <ColumnDirective field='Image' headerText='Image' template={viewImage} width='100' />
            <ColumnDirective field='fname' headerText='First Name' width='100' />
            <ColumnDirective field='lname' headerText='Last Name' width='120' />
            <ColumnDirective field='username' headerText='Username' width='100' />
            <ColumnDirective field='email' headerText='Email' width='150' />
            <ColumnDirective field='position' headerText='Position' width='100' />
            <ColumnDirective headerText='Delete user' textAlign='Center' width='100' commands={commands} />
            <ColumnDirective headerText='View User' template={viewUser} width='80' />
          </ColumnsDirective>
          <Inject services={[Page, Group, Sort, Edit, Toolbar, CommandColumn]} />
        </GridComponent>
      </div>
    );
  }
  
  export default Users;