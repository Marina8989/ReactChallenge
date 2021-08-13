import React from 'react';
import './index.css';

const Item = (props) => {
    return(
      <li> 
        {props.item.value}
        <button style={{color: 'green', margin: '0 .6rem'}} onClick={() => props.handleToggle(props.item.id)}>{props.item.complete ? "Yes": "No"}</button>
        <button style={{color: 'green', margin: '0 .6rem'}} onClick={() => props.handleRemove(props.item.id)}>Remove</button>
      </li>
    )
}
const List = (props) => {
   return(
     <ul>
       {props.list.map(item => <Item key={item} item={item} handleToggle={props.handleToggle} handleRemove={props.handleRemove}/>)}
     </ul>
   )
}
const Search = (props) => {
    return(
      <input className='input' type='text' value={props.searchInput} onChange={props.handleSearch}/>
    )
}

class Form extends React.Component {
  state={
    inputValue: ''
  }
  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }
  handleSubmit = (e) => {
     e.preventDefault();
     const value = this.state.inputValue;
     this.setState({inputValue: ''});
     this.props.handleSubmit(value);
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input
         className='input' 
         type='text' 
         value={this.state.inputValue} 
         onChange={this.handleChange}
        />
      </form>
    )
  }
}
function RandomNum() {
  let one = Math.floor(Math.random() * 100);
  let two = Math.ceil(Math.random() * 200);
  let three = Math.floor(Math.random() * 24);
  return (one + two) / three;
}
 
class App extends React.Component {
  state={
    list: [],
    searchInput: ''
  }
  handleSubmit = (value) => {
    const item = {
      id: RandomNum(),
      value,
      complete: false
    }
     const newList = [...this.state.list, item];
     this.setState({list: newList});
  }
  handleToggle = (id) => {
     const toggleItem = this.state.list.map(element => {
       if(id === element.id) {
          element.complete = !element.complete;
       }
       return element;
     })
     this.setState({list: toggleItem});
  }
  handleRemove = (id) => {
    const newList = this.state.list.filter(item => id !== item.id);
    this.setState({list: newList})
  }
  handleSearch = (e) => {
      this.setState({searchInput: e.target.value})
  }

  render() {
    const searchItem = this.state.list.filter(element => element.value.includes(this.state.searchInput));
    return (
      <div className='App'>
        <h2>Todo List</h2>
        <Form handleSubmit={this.handleSubmit}/>
        <Search handleSearch={this.handleSearch}/>
        <List 
         list={searchItem} 
         handleToggle={this.handleToggle}
         handleRemove={this.handleRemove}
        />
      </div>
    )
  }
}

export default App




























// const ListItem = (props) => {
//   return (
//     <li>
//       {props.item.value}
//       <button
//         className={props.item.completed ? "green-bg" : "blue-bg"}
//         onClick={() => props.handleToggle(props.item)}
//       >
//         {props.item.completed ? "Yes" : "No"}
//       </button>

//       <button className="red-bg" onClick={() => props.handleRemove(props.item)}>
//         Remove
//       </button>

//       <label>priority</label>
//       <select style={{color: 'green'}} onChange={(e) => props.handleSort(e, props.item)}>
//          <option value={1}>1</option>
//          <option value={2}>2</option>
//          <option value={3}>3</option>
//          <option value={4}>4</option>
//          <option value={5}>5</option>
//       </select>
//     </li>
//   );
// };


// const List = (props) => {
//   return (
//     <ol>
//       {props.list.map((item) => (
//         <ListItem
//           key={item.id}
//           item={item}
//           handleToggle={props.handleToggle}
//           handleRemove={props.handleRemove}
//           handleSort={props.handleSort}
//         />
//       ))}
//     </ol>
//   );
// };

// const Sort = (props) => {
//    return(
//        <button onClick={props.handleClick}>Sort</button>
//    )
// }

// const CheckInput = (props) => {
//   return (
//     <input className="input"
//       type="text"
//       value={props.searchInput}
//       onChange={props.handleChange}
//     />
//   );
// };


// class Form extends React.Component {
//   state = {
//     inputValue: ""
//   };

//   handleChange = (e) => {
//     this.setState({ inputValue: e.target.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const value = this.state.inputValue;
//     this.setState({ inputValue: "" });
//     this.props.handleSubmit(value);
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input className="input"
//           type="text"
//           value={this.state.inputValue}
//           onChange={this.handleChange}
//         />
//       </form>
//     );
//   }
// }



// export default class App extends React.Component {
//   state = {
//     list: [],
//     searchInput: "",
//     sorted: null
//   };
//   handleSubmit = (value) => {
//     const item = {
//       id: `${Math.floor(Math.random() * 1000)} `,
//       value,
//       priority: 1,
//       completed: false
//     };
//     const newList = [...this.state.list, item];
//     this.setState({ list: newList });
//   };
//   handleToggle = (item) => {
//     const newList = this.state.list.map((element) => {
//       if (element.id === item.id) {
//         element.completed = !element.completed;
//       }
//       return element;
//     });
//     this.setState({ list: newList });
//   };
//   handleRemove = (item) => {
//     const newList = this.state.list.filter((element) => element.id !== item.id);
//     this.setState({ list: newList });
//   };
//   handleChange = (e) => {
//     this.setState({ searchInput: e.target.value });
//   };
//   handleClick = () => {
//       if(!this.state.sorted) {
//          this.setState({sorted: true})
//       }
//       if(this.state.sorted) {
//         this.setState({sorted: false})
//       }
//   }
//   handleSort = (e, item) => {
//       const newList = this.state.list.map(element => {
//           if(element.id === item.id) {
//             item.priority = parseInt(e.target.value)
//           }
//           return element;
//       })
//       this.setState({list: newList})
//   }

//   render() {
//     const filteredArray = this.state.list.filter((item) =>
//       item.value.includes(this.state.searchInput)
//     );

//     filteredArray.sort((a, b) => {
//         if(!this.state.sorted) {
//             return a.priority - b.priority;
//         }else {
//             return b.priority - a.priority;
//         }
//     })

//     return (
//       <div className="App">
//         <Form handleSubmit={this.handleSubmit} />
//         <CheckInput handleChange={this.handleChange} />
//         <List
//           list={filteredArray}
//           handleToggle={this.handleToggle}
//           handleRemove={this.handleRemove}
//           handleSort={this.handleSort}
//         />
//         <Sort handleClick={this.handleClick}/>
//       </div>
//     );
//   }
// }
