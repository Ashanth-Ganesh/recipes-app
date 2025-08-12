"""Module for the Security class"""
from passlib.context import CryptContext
from starlette.concurrency import run_in_threadpool

class Security():



    def __init__(self):
        self.pwd_context = CryptContext(
            schemes=["argon2"],
            deprecated="auto",
        )


    def _hash_password(self, plain_password: str) -> str:
        """Method to hash password"""
        return self.pwd_context.hash(plain_password)

    async def hash_password_anync(self, unencrypted_password: str) -> str:
        """Function to hash password before storing in database.
        Running in threadpool to distribute heavy cpu workload.
        Args:
            unencrypted_password: Plain text verified password
        Returns:
            hashed_password: hashed encrypted string
        """
        hashed_password = await run_in_threadpool(self._hash_password, unencrypted_password)
        return hashed_password
    

    def _verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)
    
    async def verify_password_async(self, plain_password: str, hashed_password: str) -> bool:
        return await run_in_threadpool(self._verify_password, plain_password, hashed_password)