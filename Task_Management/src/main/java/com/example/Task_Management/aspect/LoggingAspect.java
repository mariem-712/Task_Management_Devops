package com.example.Task_Management.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    
    @Pointcut("execution(* com.example.Task_Management.services..*(..))")
    public void serviceMethods() {}

    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        log.info("\n======================== [ START ] ========================");
        log.info("\n Entering: " + joinPoint.getSignature().toShortString() + " with args: " + java.util.Arrays.toString(joinPoint.getArgs()));
        log.info("\n========================= [ END ] =========================\n");
    }

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        log.info("\n ======================== [ START ] ========================");
        log.info("\nReturned from: " + joinPoint.getSignature().toShortString() + " with result: " + result);
        log.info("\n========================= [ END ] =========================\n");
    }

    @AfterThrowing(pointcut = "serviceMethods()", throwing = "ex")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable ex) {
        log.info("\n ======================== [ START ] ========================");
        log.error("\nException in: " + joinPoint.getSignature().toShortString() + " - " + ex.getMessage());
        log.info("\n========================= [ END ] =========================\n");
    }
}