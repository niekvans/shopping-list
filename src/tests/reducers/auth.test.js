import authReducer from '../../reducers/auth';

test('should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});


test('should set login', () => {
    const uid = 123451
    const state = authReducer({}, { type: 'LOGIN', uid });
    expect(state).toEqual({
        uid
    });
});

test('should logout', () => {
    const prevState = {
        uid: 1235123
    }
    const state = authReducer(prevState, { type: 'LOGOUT' });
    expect(state).toEqual({});
});