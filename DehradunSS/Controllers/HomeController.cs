using DehradunSS.Data;
using DehradunSS.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace DehradunSS.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<HomeController> _logger;
        public int id { get; set; }

        public HomeController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpPost]
        public IActionResult Create(TestModel model)
        {
            _context.test.Add(model);
            _context.SaveChanges();
            return RedirectToAction("SignIn", "Home");
        }
        [HttpPost]
        public IActionResult SignIn(TestModel model, string returnUrl)
        {
            bool isValid = _context.test.Any(x => (x.username == model.username && x.password == model.password));
            if (isValid)
            {
                //return PartialView("DehradunSS");
                return Redirect("/Home/DehradunSS");
                //return Redirect(returnUrl);
            }
            else
            {
                ModelState.AddModelError("CustomError", "Invalid Username or password");
                return View();
            }
        }
        //public IActionResult AdminLogin(ForAdmin model, string returnUrl)
        //{
        //    bool isValid = _context.test1.Any(x => (x.username == model.username && x.password == model.password && x.role == model.role));
        //    if (isValid)
        //    {
        //        //return PartialView("DehradunSS");
        //        Response.Cookies.Append("userName", model.username);
        //        Response.Cookies.Append("userRole", model.role);
        //        return RedirectToAction("DehradunSS", "Home");
        //        //return Redirect(returnUrl);
        //    }
        //    else
        //    {
        //        ModelState.AddModelError("CustomError", "Invalid Username or password");
        //        return View();
        //    }
        //}
        public IActionResult Send(TestModel model)
        {
            bool isValid = _context.test.Any(x => x.email == model.email);
            if (isValid)
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Test Project", "jm5694990@gmail.com"));
                message.To.Add(new MailboxAddress("naren", model.email));
                message.Subject = "Forgot Email";
                message.Body = new TextPart("plain")
                {
                    Text = "Your Password : 12345"
                };
                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate("jm5694990@gmail.com", "Scan@9876");
                    client.Send(message);
                    client.Disconnect(true);

                }


                return RedirectToAction("SignIn", "Home");
            }
            else
            {
                return RedirectToAction("index", "Home");
            }


        }


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult AdvanceSearch()
        {
            return View();
        }
        public IActionResult predefinequery()
        {
            return View();
        }

        public IActionResult DehradunSS()
        {
            return View();
        }
        public IActionResult ForgotPass()
        {
            return View();
        }

        public IActionResult SignIn()
        {
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }
        




        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

