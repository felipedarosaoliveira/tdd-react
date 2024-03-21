import { describe, afterAll, afterEach, expect, test, vi } from 'vitest'
import { renderHook, screen, fireEvent } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { service } from './service/login-service';
import { useLoginState } from './useLoginState';
import { act } from 'react-dom/test-utils';
describe('Login State Management', () => {

    const server = setupServer();

    afterEach(() => {
        server.resetHandlers();
        vi.useRealTimers();
    })

    afterAll(() => {
        server.close();
    })

    test('State must inicialize with empty values', () => {
        configureDefaultServer();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.errorMessage).toBe(null);
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.showPassword).toBe(false);
    })

    test('State must update username when onSetUsernameHandler is called', () => {
        configureDefaultServer();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        act(() => {
            result.current.onSetUsernameHandler({ value: "myusername" })
        })
        expect(result.current.username).toBe("myusername");
    })

    test('State must update password when onSetPasswordHandler is called', () => {
        configureDefaultServer();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        act(() => {
            result.current.onSetPasswordHandler({ value: "123456" })
        })
        expect(result.current.password).toBe("123456");
    })

    test('State must contains a message error when username and password are empty and onAuthenticateHandler is called', async () => {
        configureDefaultServer();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
        await act(async () => {
            await result.current.onAuthenticateHandler()
        })
        expect(result.current.errorMessage).toBeDefined();
    })

    test('State must contains a message error when onAuthenticateHandler is called and server returns an error', async () => {
        configureServerWithUnauthorizedStatus();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
        act(() => {
            result.current.onSetUsernameHandler({ value: "myusername" })
        })
        act(() => {
            result.current.onSetPasswordHandler({ value: "123456" })
        })
        expect(result.current.username).toBe("myusername");
        expect(result.current.password).toBe("123456");
        await act(async () => {
            await result.current.onAuthenticateHandler()
        })
        expect(result.current.errorMessage).toBe('Login ou senha inválido.');
    })

    test('State must clear  errorMessage when  onSetUsernameHandler is called', async () => {
        configureServerWithUnauthorizedStatus();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);

        await act(async () => {
            await result.current.onAuthenticateHandler()
        })
        expect(result.current.errorMessage).toBeDefined();
        act(() => {
            result.current.onSetUsernameHandler({ value: "myusername" })
        })
        expect(result.current.errorMessage).toBe(null);
    })


    test('State must clear  errorMessage when  onSetPasswordHandler is called', async () => {
        configureServerWithUnauthorizedStatus();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
    
        await act(async () => {
          await result.current.onAuthenticateHandler()
        })
        expect(result.current.errorMessage).toBeDefined();
        act(() => {
          result.current.onSetPasswordHandler({ value: "123456" })
        })
        expect(result.current.errorMessage).toBe(null);
      })


      test('State must navigate to home when  onAuthenticateHandler has success', async () => {
        configureDefaultServer();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
    
        act(() => {
          result.current.onSetUsernameHandler({ value: "myusername" })
        })
        act(() => {
          result.current.onSetPasswordHandler({  value: "123456" })
        })
        expect(result.current.username).toBe("myusername");
        expect(result.current.password).toBe("123456");
        await act(async () => {
          await result.current.onAuthenticateHandler()
        })
    
        expect(navigateTo).toBeCalledWith('/home')
      })
    
      test('State must active loading  when  onAuthenticateHandler is called', async () => {
        server.use(http.post('/api/authenticate', async () => {
          await delay(1000);
          return HttpResponse.json({ token: "blablabla" })
        }
        ))
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
        expect(result.current.loading).toBe(false);
    
        act(() => {
          result.current.onSetUsernameHandler({ value: "myusername" })
        })
        act(() => {
          result.current.onSetPasswordHandler({ value: "123456" })
        })
        expect(result.current.username).toBe("myusername");
        expect(result.current.password).toBe("123456");
        await act(async () => {
          result.current.onAuthenticateHandler()
        })
        expect(result.current.loading).toBe(true);
    
      })
    
      test('State must active loading  when  onAuthenticateHandler is called', async () => {
        server.use(http.post('/api/authenticate', async () => {
          await delay(1000);
          return HttpResponse.json({ token: "blablabla" })
        }
        ))
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
        expect(result.current.loading).toBe(false);
    
        act(() => {
          result.current.onSetUsernameHandler({  value: "myusername" })
        })
        act(() => {
          result.current.onSetPasswordHandler({  value: "123456" })
        })
        expect(result.current.username).toBe("myusername");
        expect(result.current.password).toBe("123456");
        await act(async () => {
          result.current.onAuthenticateHandler()
        })
    
        expect(result.current.loading).toBe(true);
    
      })
    
      test('State must disable loading  when  after onAuthenticateHandler is called', async () => {
        configureServerWithUnauthorizedStatus();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errorMessage).toBe(null);
        expect(result.current.loading).toBe(false);
    
        act(() => {
          result.current.onSetUsernameHandler({ value: "myusername" })
        })
        act(() => {
          result.current.onSetPasswordHandler({ value: "123456" })
        })
        expect(result.current.username).toBe("myusername");
        expect(result.current.password).toBe("123456");
        await act(async () => {
          await result.current.onAuthenticateHandler()
        })
    
        expect(result.current.loading).toBe(false);
    
      })
    
      test('State must navitate to  Password Redefinition page after onChangePasswordHandler is called', async () => {
        configureServerWithUnauthorizedStatus();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
    
    
        act(() => {
          result.current.onChangePasswordHandler();
        })
    
    
        expect(navigateTo).toBeCalledWith('/changePassword')
    
      })
    
      test('State must change showPasswordValue when onTogglePasswordIcon is caled', () => {
        configureDefaultServer();
        const navigateTo = vi.fn();
        const { result } = renderHook(useLoginState, {
            initialProps: { service: service, navigateTo: navigateTo }
        });
        expect(result.current.showPassword).toBe(false);
        act(() => {
          result.current.onTogglePasswordIcon(true);
        })
        expect(result.current.showPassword).toBe(true);
        act(() => {
          result.current.onTogglePasswordIcon(false);
        })
        expect(result.current.showPassword).toBe(false);
      })
    



    function configureDefaultServer() {
        server.use(http.post('/api/authenticate', () => {
            return HttpResponse.json({ token: "blablabla" })
        }
        ))
        server.listen();
    }

    function configureServerWithUnauthorizedStatus() {
        server.use(http.post('/api/authenticate', async () => {
            return new HttpResponse('NOT AUTHORIZED', {
                status: 401,
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
        }))
        server.listen();
    }

})