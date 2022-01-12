import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import IdeasList from './components/IdeasList';
import Search from './components/Search';
import Header from './components/Header';
import GroupList from './components/GroupList';

const IdeaManagementTool = () => {
	const [notes, setNotes] = useState([
	]);
  const [groups, setGroups] = useState([
	]);
	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	const [GroupText, setGroupText] = useState();

    const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	
	const deleteGroupNote = (id1,id2) => {
		
		const tempGroup = groups.filter(function(item){return item.filter(function(element){return item.id!==id1 || element.id!==id2}) })  
		
		
		setGroups(tempGroup);
	};

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-IdeaManagementTool-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-IdeaManagementTool-data',
			JSON.stringify(notes)
		);
	}, [notes]);
    
    const addGroup = (arr) =>{
		const newGroup = {
			id: groups.length+1,
			group: arr
		};
	
		const newGroups = [...groups, newGroup];
		setGroups(newGroups);
	}
    
	const editNote = (id,text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		const tempNotes = newNotes.filter((note) => note.id !== id);
		setNotes(tempNotes);
		
	} 

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const deleteGroup = (id) => {
		const newGroups = groups.filter((group) => group.id !== id);
		setGroups(newGroups);
	};


	const handleSaveClick = () => {
        setGroupText(notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)))
	    alert(GroupText.length+" highlights grouped");
        addGroup(GroupText);
        setGroupText();
        
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />

				<button className='save' onClick={handleSaveClick}>
					Group Ideas
				</button>
        <h1>Ideas</h1>
				<br/>
				<IdeasList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					handleEditNote={editNote}
				/>
				<GroupList
				groups={groups}
				handleDeleteGroup={deleteGroup}
				handleDeleteGroupNote={deleteGroupNote}
				/>
				
				
			</div>
		</div>
	);
};

export default IdeaManagementTool;