"""Module for the Logger class"""
import logging
from logging.handlers import RotatingFileHandler
from dotenv import load_dotenv
load_dotenv()
import configparser

class ColouredFormatter(logging.Formatter):
    """Custom formatter to add colour to log levels using ANSI escape codes.
    
    Attributes:
        COLORS: The ANSI color codes.
        RESET: The ANSI reset escape code.
    """
    
    COLORS = {
        'DEBUG': '\033[36m',     # Cyan
        'INFO': '\033[32m',      # Green
        'WARNING': '\033[33m',   # Yellow
        'ERROR': '\033[31m',     # Red
        'CRITICAL': '\033[91m'   # Bright Red
    }

    RESET = '\033[0m'

    def format(self, record) -> str:
        """Method to format logs with colours."""
        log_color = self.COLORS.get(record.levelname, self.RESET)
        record.levelname = f"{log_color}{record.levelname}{self.RESET}"
        return super().format(record)


class Logger():
    """Logger class to configure and return project logger"""

    @staticmethod
    def new_logger(name: str) -> logging.getLogger:
        """
        Function to configure and return a logger.
        Args:
            name: The name of the module from which the logger is loaded/created.
        Returns:
            logger: The configured logger.
        """
        # Load config file
        config = configparser.ConfigParser()
        config.read("config.ini")

        # Initializing logger
        logger = logging.getLogger(name)

        # Prevent duplicate handlers
        if logger.hasHandlers():
            return logger  

        log_level = config.get("LOGS", "log_level", fallback="DEBUG").upper()
        log_file = config.get("LOGS", "log_file", fallback="chatbot.log")

        # Configuration
        format = '%(asctime)s %(name)s %(filename)s:%(lineno)d [%(levelname)s] : %(message)s'
        formatter = ColouredFormatter(format, datefmt='%d-%m-%Y %H:%M:%S')

        # Conditional log file configuration with rotation
        if log_file:
            log_file_size = (config.getint("LOGS", "log_file_size", fallback=5) * 1024) * 1024
            log_file_backup = config.getint("LOGS", "log_file_backup", fallback=0)
            file_handler = RotatingFileHandler(log_file, maxBytes=log_file_size, backupCount=log_file_backup)  # 5 MB per file, no backups
            file_handler.setFormatter(logging.Formatter(format))
            logger.addHandler(file_handler)

        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
        
        # Log level config
        logger.setLevel(getattr(logging, log_level, logging.DEBUG))

        return logger
