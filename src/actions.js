export const actionNames = {
    APPLY_SERVER_SIDE_TIME: 'APPLY_SERVER_SIDE_TIME',
    FETCH_SERVER_SIDE_TIME: 'FETCH_SERVER_SIDE_TIME',
}

export const actions = {
    applyServerSideTime: time => ({
        type: actionNames.APPLY_SERVER_SIDE_TIME,
        payload: time
    }),
    fetchServerSideTime: () => ({
        type: actionNames.FETCH_SERVER_SIDE_TIME
    })
}