export const colors = {
    green: '#5cb85c'
}

//TODO: use this paths for routeing
export const paths = {

}

export const millisecondsOfDay = 1000 * 60 * 60 * 24;

export const popupId = {
    ADD_CALENDAR: 'ADD_CALENDAR',
    MANAGE_CALENDAR: 'MANAGE_CALENDAR',
    USER_SETTINGS: 'USER_SETTINGS',
    EDIT_APPOINTMENT: 'EDIT_APPOINTMENT' 
}

export const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

export const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]