var count = 0;

(function timeout() {
  setTimeout(() => {
    count += 1000;
    timeout();
  }, 1000);
}())
